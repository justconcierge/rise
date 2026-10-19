// Add the verified Formspree endpoint to services.html's data-endpoint attribute.
const inquiryForm = document.getElementById('consultation-form');
const inquiryFields = document.getElementById('inquiry-fields');
const inquiryStatus = document.getElementById('inquiry-status');
const inquiryEndpoint = inquiryForm.dataset.endpoint;
if (/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(inquiryEndpoint)) {
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
            method: 'POST', body: inquiryData, headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Submission failed');
        inquiryForm.reset();
        inquiryStatus.textContent = 'Thank you—your inquiry has been submitted to Justine.';
    } catch {
        inquiryStatus.textContent = 'We could not confirm your inquiry was sent. Your entries are still here. Please try again, or contact justine.tech.exec@gmail.com directly.';
    } finally {
        inquiryFields.disabled = false;
    }
});
