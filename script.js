document.addEventListener('DOMContentLoaded', function() {
    const chineseTextElement = document.getElementById('chinese-text');
    const translateButton = document.getElementById('translate-button');
    const vietnameseTextElement = document.getElementById('vietnamese-text');
    const errorMessageElement = document.getElementById('error-message');

    const baseURL = 'https://text.pollinations.ai/dịch văn bản sau sang tiếng việt và chỉ hiện bản dịch:';

    translateButton.addEventListener('click', function() {
        const textToTranslate = chineseTextElement.value.trim();

        if (!textToTranslate) {
            errorMessageElement.textContent = "Vui lòng nhập văn bản tiếng Trung cần dịch.";
            vietnameseTextElement.textContent = ""; // Xóa kết quả cũ
            return;
        }

        errorMessageElement.textContent = ""; // Xóa thông báo lỗi trước đó
        vietnameseTextElement.textContent = "Đang dịch..."; // Hiển thị trạng thái dịch

        const encodedText = encodeURIComponent(textToTranslate);
        const apiUrl = baseURL + encodedText;

        fetch(apiUrl, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
                }
                return response.text(); // Lấy response body là text
            })
            .then(translatedText => {
                vietnameseTextElement.textContent = translatedText.trim(); // Hiển thị bản dịch
            })
            .catch(error => {
                console.error("Lỗi Fetch API:", error);
                vietnameseTextElement.textContent = ""; // Xóa trạng thái "Đang dịch..."
                errorMessageElement.textContent = "Lỗi: Không thể dịch văn bản. Vui lòng thử lại sau.";
            });
    });
});
