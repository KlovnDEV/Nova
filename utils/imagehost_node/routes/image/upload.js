import * as fs from 'fs';

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function dataUrlToBuffer(dataurl) {
  var ind = dataurl.indexOf(';base64,');
  if (ind === -1) return null;

  var mimetype = dataurl.substring(0,ind);

  var data = dataurl.substring(ind+8)

  /*
  var regex = /^data:.+\/(.+);base64,(.*)$/;
  var matches = dataurl.match(regex);
  var ext = matches[1];
  var data = matches[2];
  */
  return {buffer: Buffer.from(data, 'base64'), mimetype: mimetype};
}

WEB.route(
  "/image/upload",
  [
    WEB.val.body("dataurl").isString(),
  ],
  async (request, response) => {

    const { dataurl } = request.body;

    const hash = makeid(8); //sha256(dataurl);

    const {buffer, mimetype} = dataUrlToBuffer(dataurl);

    let fileName;

    switch (mimetype) {
      case "data:image/png": fileName = "public/images/"+hash+".png";break;
      case "data:image/jpeg": fileName = "public/images/"+hash+".jpg";break;
      default: throw "Неизвестный тип файла! " + mimetype;
    }

    const fileUrl = `http://${process.env.EXTERNAL_HOST || process.env.HOST}:${process.env.PORT}/${fileName}`;
    fs.writeFileSync(fileName, buffer);

    response.send({ url: fileUrl, timestamp: new Date() });
  }
);
