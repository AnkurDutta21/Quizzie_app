import { errorToast, successToast } from "./showToast";

export const copyLink = (id,type) => {
    try {
        const url = new URL(window.location.href);
        url.pathname = `/${type}/${id}`;
    
        const modifiedUrl = url.href;
    
        navigator.clipboard.writeText(modifiedUrl)
          .then(() => {
           successToast('URL copied to clipboard');
          })
          .catch(err => {
            errorToast('Failed to copy URL');
          });
      } catch (err) {
        console.error('Error constructing URL: ', err);
        errorToast('Error constructing URL');
      }

}
export const getLink = (id, type) => {
  const url = new URL(window.location.href);
  url.pathname = `/${type}/${id}`;
  const modifiedUrl = url.href;
  return modifiedUrl;
};