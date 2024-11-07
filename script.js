const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
})
let cart = [];
let cartList = document.getElementById('cart-list');
let totalItems = document.getElementById('total-items');
let totalPrice = document.getElementById('total-price');
let cartSummary = document.getElementById('cart-summary');
let clearCartButton = document.getElementById('clear-cart');

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    addItemToCart(name, price);
  });
});

function addItemToCart(name, price) {
  // Verificar se o item já existe no carrinho
  const existingItemIndex = cart.findIndex(item => item.name === name);
  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  console.log(cart);
  updateCart();
}

function removeItemFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  // Limpar a lista de itens do carrinho
  cartList.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)} 
      <span class="remove-item" onclick="removeItemFromCart(${index})">Remover</span>`;
    cartList.appendChild(li);
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });

  // Atualizar resumo
  totalItems.textContent = itemCount;
  totalPrice.textContent = total.toFixed(2);

  // Exibir carrinho se houver itens
  if (cart.length > 0) {
    cartSummary.style.display = 'block';
  } else {
    cartSummary.style.display = 'none';
  }
}

// Limpar carrinho
clearCartButton.addEventListener('click', function() {
  cart = [];
  updateCart();
});
function confirmarPedido() {
  // Exibe a mensagem de confirmação
  const confirmar = confirm("Você tem certeza que deseja enviar o pedido?");
  
  if (confirmar) {
      window.location.href = "pedido_confirmado.html";
  } else {
      // Se o usuário clicar "Cancelar", apenas fecha a caixa de diálogo
      alert("Pedido não enviado.");
  }
}
function mostrarCarrinho() {
  const itensCarrinho = JSON.parse(localStorage.getItem('carrinho')); // Supondo que os itens estão no localStorage
  const listaItens = document.getElementById('itens-pedido');

  // Limpa a lista antes de adicionar os itens
  listaItens.innerHTML = '';

  if (itensCarrinho && itensCarrinho.length > 0) {
      itensCarrinho.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
          listaItens.appendChild(li);
      });
  } else {
      listaItens.innerHTML = "<li>Seu carrinho está vazio.</li>";
  }
}

// Chama a função quando a página carrega
window.onload = mostrarCarrinho;