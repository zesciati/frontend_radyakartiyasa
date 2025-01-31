export function validateForm(formData) {
    for (const key in formData) {
        if (!formData[key]) {
            return { success: false, message: `Kolom ${key} harus diisi.` };
        }
    }
    return { success: true };
}
