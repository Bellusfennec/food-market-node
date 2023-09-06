const jsonwebtoken = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
  generate(payload) {
    const accessToken = jsonwebtoken.sign(payload, config.get("accessSecret"), {
      expiresIn: "1h",
    });
    const refreshToken = jsonwebtoken.sign(
      payload,
      config.get("refreshSecret")
    );
    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }

  async save(userId, refreshToken) {
    const data = await Token.findOne({ userId });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({ userId, refreshToken });
    return token;
  }
  validateRefresh(refreshToken) {
    try {
      return jsonwebtoken.verify(refreshToken, config.get("refreshSecret"));
    } catch (error) {
      return null;
    }
  }
  validateAccess(accessToken) {
    try {
      return jsonwebtoken.verify(accessToken, config.get("accessSecret"));
    } catch (error) {
      return null;
    }
  }
  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
