export const formatTime = (time) => new Date(`1970-01-01T${time}`).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
export const formatDate = (date) => new Date(date).toLocaleDateString('en-UK', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
export const getAdvisorFirstName = (advisorUsername) => advisorUsername.split(/(?=[A-Z][a-z])/)[0];
export const getCookie = (name) => document.cookie.split(`; ${name}=`).pop().split(';').shift();
