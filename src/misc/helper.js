export function getNameInitials(name) {
    // Check if name is valid and not empty
    if (!name || typeof name !== 'string') {
        return '';  // Return an empty string or handle as per your requirement
    }

    const splitName = name.trim().toUpperCase().split(' ');

    if (splitName.length > 1) {
        return splitName[0][0] + splitName[1][0];
    }

    return splitName[0][0] || '';  // Safeguard against names with no characters
}
