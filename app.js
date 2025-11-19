// ---------- ELEMENTOS DEL DOM ----------
const form = document.getElementById("expense-form");
const historyList = document.getElementById("history-list");
const clearBtn = document.getElementById("clear-history");

// ---------- CARGAR DATOS GUARDADOS ----------
let expenses = [];

const saved = localStorage.getItem("mis_gastos");
if (saved) {
  try {
    expenses = JSON.parse(saved);
  } catch (e) {
    expenses = [];
  }
}

// ---------- FORMATEAR CON PUNTOS DE MILES ----------
function formatGs(value) {
  const num = Number(value) || 0;
  return "Gs. " + num.toLocaleString("de-DE");
}

// ---------- DIBUJAR HISTORIAL ----------
function renderHistory() {
  historyList.innerHTML = "";

  if (expenses.length === 0) {
    const p = document.createElement("p");
    p.className = "history-empty";
    p.textContent = "No hay gastos cargados todavía.";
    historyList.appendChild(p);
    return;
  }

  const table = document.createElement("table");
  table.className = "history-table";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Monto</th>
      <th>Categoría</th>
      <th>Fecha</th>
      <th>Forma de pago</th>
      <th>Banco</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  expenses.forEach((exp) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatGs(exp.amount)}</td>
      <td>${exp.description}</td>
      <td>${exp.date}</td>
      <td>${exp.payment}</td>
      <td>${exp.bank}</td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  historyList.appendChild(table);
}

// ---------- GUARDAR EN LOCALSTORAGE ----------
function saveExpenses() {
  localStorage.setItem("mis_gastos", JSON.stringify(expenses));
}

// ---------- MANEJAR ENVÍO DEL FORMULARIO ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value.trim();
  const description = document.getElementById("description").value.trim();
  const date = document.getElementById("date").value;
  const payment = document.getElementById("payment").value;
  const bank = document.getElementById("bank").value;

  if (!amount || !description || !date || !payment || !bank) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const newExpense = {
    amount: amount,
    description: description,
    date: date.split("-").reverse().join("/"), 
    payment: payment,
    bank: bank
  };

  expenses.push(newExpense);
  saveExpenses();
  renderHistory();

  form.reset();
});

// ---------- BORRAR HISTORIAL (CORRECTO) ----------
clearBtn.addEventListener("click", function () {
  if (confirm("¿Seguro que deseas borrar todo el historial?")) {
    expenses = [];
    saveExpenses();
    renderHistory();
  }
});

// ---------- RENDER INICIAL ----------
renderHistory();
