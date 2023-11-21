import { StorageReference, getDownloadURL, ref } from 'firebase/storage';
import { storageRef, firestoreRef } from './helpers/firebase';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
type Review = {
	text: string;
	rating: number; // from 1 to 5
};

// Example array of review objects
const reviews: Review[] = [
	{
		text: 'I really enjoyed the water bottle, I just wish they carried this in a larger size as I go for long hikes. But overall the aesthetic, manufacturing, and functional design are great for what I needed.',
		rating: 4, // Default rating set to 4
	},
	{
		text: 'The water bottle was fine, although the design was a bit lacking and could be improved.',
		rating: 3, // Default rating set to 3
	},
	{
		text: "This is a truly incredible water bottle, I keep it with me all the time when I'm traveling and it has never let me down.",
		rating: 5, // Default rating set to 5
	},
];

// Function to create a single star element
function createStar(
	id: string,
	isChecked: boolean,
	isHovered: boolean
): string {
	const checkedClass = isChecked ? 'text-yellow-500' : '';
	const hoverClass = isHovered
		? 'hover:text-yellow-500'
		: 'hover:text-gray-400';
	return `<label for="${id}" class="cursor-pointer ${checkedClass} ${hoverClass}">★</label>`;
}

// Function to render the star rating for each review
function renderStars(
	reviewIndex: number,
	currentRating: number,
	hoverRating: number
): string {
	let starsHtml = '';
	for (let i = 1; i <= 5; i++) {
		const starId = `star-${reviewIndex}-${i}`;
		const isChecked = i <= currentRating;
		const isHovered = i <= hoverRating;
		starsHtml += createStar(starId, isChecked, isHovered);
	}
	return starsHtml;
}

// Function to render the full list of reviews
function renderReviews(reviews: Review[]): string {
	return reviews
		.map(
			(review, index) => `
    <div class="bg-white border rounded-lg shadow p-4 mb-4">
      <p class="mb-3">${review.text}</p>
      <div class="flex" onmouseover="handleMouseOver(event, ${index})" onmouseout="handleMouseOut(${index})">
        ${renderStars(index, review.rating, 0)}
      </div>
    </div>
  `
		)
		.join('');
}

// Handle mouse over events to update the stars display
function handleMouseOver(event: MouseEvent, reviewIndex: number): void {
	const target = event.target as HTMLElement;
	const rating = parseInt((<any>target).htmlFor.split('-')[2]);
	updateStars(reviewIndex, rating);
}

// Handle mouse out events to reset the stars display
function handleMouseOut(reviewIndex: number): void {
	updateStars(reviewIndex, reviews[reviewIndex].rating);
}

// Update the display of stars for a specific review
function updateStars(reviewIndex: number, hoverRating: number): void {
	const reviewStars = document.querySelector(`#review-${reviewIndex} .flex`);
	reviewStars!.innerHTML = renderStars(
		reviewIndex,
		reviews[reviewIndex].rating,
		hoverRating
	);
}

// Initial rendering of reviews
document.getElementById('reviews-container')!.innerHTML =
	renderReviews(reviews);
