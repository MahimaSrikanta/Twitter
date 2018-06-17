let url = null;
if (process.env.NODE_ENV === 'production') {
  url = `${window.location.origin}`;
} else {
  url = 'http://localhost:8000';
}
export const baseUrl = url;
