function fibonacci(n) {
    if (n <= 0) return [0];
    if (n === 1) return [0, 1];

    const prev = fibonacci(n - 1);
    const next = prev[prev.length - 1] + prev[prev.length - 2];
    return [...prevFib, next];
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
