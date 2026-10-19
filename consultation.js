// Web3Forms submission keys are designed for use in public HTML forms.
const inquiryForm = document.getElementById('consultation-form');
const inquiryFields = document.getElementById('inquiry-fields');
const inquiryStatus = document.getElementById('inquiry-status');
const inquiryEndpoint = inquiryForm.dataset.endpoint;
if (inquiryEndpoint === 'https://api.web3forms.com/submit' && inquiryForm.elements.access_key.value) {
    inquiryFields.disabled = false;
    inquiryStatus.textContent = 'Share a little about your next chapter. All fields are required.';
}
inquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (inquiryFields.disabled || !inquiryForm.reportValidity()) return;
    const inquiryData = new FormData(inquiryForm);
    inquiryFields.disabled = true;
    inquiryStatus.textContent = 'Sending your inquiry…';
    try {
        const response = await fetch(inquiryEndpoint, {
            method: 'POST', body: JSON.stringify(Object.fromEntries(inquiryData)),
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
        });
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error('Submission failed');
        inquiryForm.reset();
        inquiryStatus.textContent = 'Thank you—your inquiry has been submitted to Justine.';
    } catch {
        inquiryStatus.textContent = 'We could not confirm your inquiry was sent. Your entries are still here. Please try again, or contact justine.tech.exec@gmail.com directly.';
    } finally {
        inquiryFields.disabled = false;
    }
});
