const request = require('request-promise').defaults({ jar: true });
const cheerio = require('cheerio');
const findAnswer = require('./adpagespeed');

const uri = 'http://applicant-test.us-east-1.elasticbeanstalk.com/';
const options = {
  uri,
  transform: (body) => cheerio.load(body)
};

(async () => {
  const $ = await request(options);
  const tokenValue = await $('#token').val();
  const token = findAnswer(tokenValue);

  const $2 = await request({
    method: 'POST',
    form: {
        token
    },
    headers: {
      Referer: uri,
    },
    ...options,
  });

  const currentAnswer = $2('#answer').html();

  console.log(`A resposta agora é: ${currentAnswer}`);
})();
