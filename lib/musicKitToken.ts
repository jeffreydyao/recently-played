// Modified from https://gist.github.com/leemartin/0dac81a74a58f8587270dca9089ddb7f#file-musickit-token-encoder-js
// Generates an Apple MusicKit developer token.

const teamId = process.env.APPLE_DEVELOPER_TEAM_ID;
const keyId = process.env.APPLE_DEVELOPER_KEY_ID;

const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path") // https://stackoverflow.com/questions/33133987/cannot-open-ssl-key-file-in-node-server-enoent

const privateKey = fs.readFileSync(path.resolve('AuthKey.p8')).toString();

export default function musicKitToken() {
  const jwtToken = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "180d", 
    issuer: teamId,
    header: {
      alg: "ES256",
      kid: keyId,
    },
  });

  return jwtToken;
}
