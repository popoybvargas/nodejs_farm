module.exports = (template, product) =>
{
  const { id, productName, image, from, nutrients, quantity, price, organic, description } = product;
  let templateWithData = template.replace(/{%ID%}/g, id);
  templateWithData = templateWithData.replace(/{%NAME%}/g, productName);
  templateWithData = templateWithData.replace(/{%IMAGE%}/g, image);
  templateWithData = templateWithData.replace(/{%FROM%}/g, from);
  templateWithData = templateWithData.replace(/{%NUTRIENTS%}/g, nutrients);
  templateWithData = templateWithData.replace(/{%QUANTITY%}/g, quantity);
  templateWithData = templateWithData.replace(/{%PRICE%}/g, price);
  templateWithData = templateWithData.replace(/{%NOT_ORGANIC%}/g, organic ? '' : 'not-organic');
  templateWithData = templateWithData.replace(/{%DESCRIPTION%}/g, description);
  
  return templateWithData;
};