// export default cardTemplate = item => `<div class='photo-card'>
//     <a href='${item.largeImageURL}'>
//       <img src='${item.webformatURL}' alt='${item.tags}' loading='lazy' />
//     </a>
//     <div class='info'>
//       <p class='info-item'>
//         <b>Likes</b>
//         ${item.likes}
//       </p>
//       <p class='info-item'>
//         <b>Views</b>
//         ${item.views}
//       </p>
//       <p class='info-item'>
//         <b>Comments</b>
//         ${item.comments}
//       </p>
//       <p class='info-item'>
//         <b>Downloads</b>
//         ${item.downloads}
//       </p>
//     </div>
//   </div>
// `;

export default function cardTemplates(item) {
  return `<div class='photo-card'>
    <a href='${item.largeImageURL}'>
      <img src='${item.webformatURL}' alt='${item.tags}' loading='lazy' />
    </a>
    <div class='info'>
      <p class='info-item'>
        <b>Likes</b>
        ${item.likes}
      </p>
      <p class='info-item'>
        <b>Views</b>
        ${item.views}
      </p>
      <p class='info-item'>
        <b>Comments</b>
        ${item.comments}
      </p>
      <p class='info-item'>
        <b>Downloads</b>
        ${item.downloads}
      </p>
    </div>
  </div>
`;
}
