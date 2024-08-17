function getRatingStatus(rating) {
    if (rating < 5.0) return 'Bad';
    if (rating < 6.0) return 'Alright';
    if (rating < 7.0) return 'Good';
    return 'Excellent';
}

export default getRatingStatus