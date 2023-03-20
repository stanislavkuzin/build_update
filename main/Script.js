
window.example.addUpdateMSGHandler((event, data) => {
  console.log(data);
  updateMSG.textContent = data;
});

window.example.addVersionMSGHandler((event, data) => {
  version.textContent = data;
  console.log(data);
});
