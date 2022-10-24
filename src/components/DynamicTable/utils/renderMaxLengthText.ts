/**
 * Simple function that will return first 50 characters from text you passed as an 1st argument. IF  you want to customize max characters number just pass 2nd argument
 */
const renderMaxLengthText = (text: string, customMaxLength?: number) => {
  const maxLength = customMaxLength || 50;

  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export default renderMaxLengthText;
