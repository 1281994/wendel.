function createHeartDrop() {
    const container = document.querySelector('.container');
    const heart = document.querySelector('.heart');

    // Create the drop element
    const drop = document.createElement('div');
    drop.classList.add('drop');

    // Get heart position
    const rect = heart.getBoundingClientRect();
    // Center X of the heart
    const centerX = rect.left + rect.width / 2;
    // Bottom tip Y of the heart (approximate)
    // The bounding box includes the lobes, so the tip is at the very bottom.
    const bottomTipY = rect.bottom - 15; // Subtract a bit to overlap slightly

    // Spawn drops along the bottom "V" shape of the heart
    // The heart's bottom is roughly triangular.
    // We pick a random X offset from the center.
    // The straight edges are roughly 70-80px long horizontally from the center.
    const spread = 80; // Maximum spread to cover the full V-shape
    const randomX = (Math.random() - 0.5) * (spread * 2);

    // Calculate Y based on X to follow the V shape (slope is 1 for 45deg)
    // As we move away from center, Y goes up.
    const yOffset = Math.abs(randomX); // Slope 1 matches the 45deg rotation
    const startY = bottomTipY - yOffset;

    drop.style.left = (centerX + randomX) + 'px';
    drop.style.top = startY + 'px';

    // Randomize size slightly
    const scale = 0.5 + Math.random() * 0.5;
    drop.style.transform = `rotate(-45deg) scale(${scale})`;

    container.appendChild(drop);

    // Remove the drop after animation ends
    setTimeout(() => {
        drop.remove();
    }, 3000);
}

// Create drops continuously
setInterval(createHeartDrop, 50); // Increased frequency slightly

// Animation Sequence
window.addEventListener('load', () => {
    const cupid = document.querySelector('.cupid');
    const arrow = document.querySelector('.arrow');
    const message = document.querySelector('.message');

    // Start Cupid flying after a short delay
    setTimeout(() => {
        cupid.classList.add('fly');

        // Shoot arrow when Cupid is in position (approx 1.5s into flight)
        setTimeout(() => {
            arrow.classList.add('shoot');

            // Show message when arrow hits (approx 0.5s after shot start)
            // Also switch arrow to embedded pulsing state
            setTimeout(() => {
                message.classList.add('show');

                // Switch to embedded state to pulse with heart
                arrow.classList.remove('shoot'); // Remove shoot animation
                arrow.classList.add('embedded'); // Add pulse animation

                // Move arrow inside heart to sync pulse animation
                document.querySelector('.heart').appendChild(arrow);

            }, 500); // Match shootArrow duration (0.5s)

        }, 1500);

    }, 1000);
});
