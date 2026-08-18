export const formatDisplayDate = (dateStr, fallback = null) => {
    if (!dateStr) return fallback;
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return new Intl.DateTimeFormat('en-GB', { 
        weekday: 'long', 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric', 
        timeZone: 'UTC' 
    }).format(d);
};
