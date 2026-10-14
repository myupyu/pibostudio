document.querySelectorAll<HTMLElement>('[data-product-art]').forEach(root=>{
 root.querySelectorAll<HTMLButtonElement>('[data-art-choice]').forEach(button=>button.addEventListener('click',()=>{
  const image=root.querySelector<HTMLImageElement>('[data-preview-image]');const name=root.querySelector<HTMLElement>('[data-preview-name]');
  if(image&&button.dataset.src)image.src=button.dataset.src;if(name)name.textContent=button.dataset.name??'';
  root.querySelectorAll('[data-art-choice]').forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));
 }));
});
