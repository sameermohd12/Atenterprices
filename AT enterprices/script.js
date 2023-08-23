const fileInput = document.getElementById('fileInput');
const progressBar = document.getElementById('progressBar');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadFile(file);
    }
});

function uploadFile(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true); // Replace 'upload.php' with your server-side upload script URL
    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            progressBar.value = percent;
        }
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            progressBar.value = 100; // Set progress to 100% when upload is complete
            console.log('Upload complete');
        }
    };

    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
}
