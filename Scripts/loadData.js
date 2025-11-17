function openPDF(url) {
    document.getElementById("pdfFrame").src = url;
    new bootstrap.Modal(document.getElementById("pdfModal")).show();
}

async function loadTabData(tabId) {
    const box = document.getElementById(tabId);
    box.innerHTML = "";

    const key = tabId.toUpperCase();
    const data = window.DB[key] || [];

    if (data.length === 0) {
        box.innerHTML = "<p>Chưa có bài học.</p>";
        return;
    }

    // TẠO TABLE
    const table = document.createElement("table");
    table.className = "table table-dark table-hover table-striped";

    table.innerHTML = `
        <thead>
            <tr>
                <th style="width:30%">TÊN BÀI</th>
                <th style="width:20%">NGÀY TẠO</th>
                <th style="width:10%" class="text-center">XEM</th>
                <th style="width:10%" class="text-center">TẢI</th>
                <th style="width:10%" class="text-center">YOUTUBE</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    data.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.ten_bai}</td>
            <td>${item.ngay_tao}</td>
            <td class="text-center">
                ${item.link ? `<button class="btn btn-sm btn-success" onclick="openPDF('${item.link}')">📖Xem</button>` : '--'}                
            </td>
            <td class="text-center">
                ${item.link ? `
                <a class="btn btn-sm btn-primary"
                href="${item.link
                        .replace('./','https://raw.githubusercontent.com/anhjob/bai_giang_tin_hoc/main/')
                        }"
                download>
                🔽Tải xuống
                </a>` : '--'}
            </td>
            <td class="text-center">
                ${item.youtube ? `<a class="btn btn-sm btn-danger" href="${item.youtube}" target="_blank">📼YouTube</a>` : '--'}
            </td>
        `;

        tbody.appendChild(tr);
    });

    box.appendChild(table);
}

document.addEventListener("DOMContentLoaded", () => loadTabData("K7"));

document.querySelectorAll(".nav-link").forEach(btn => {
    btn.addEventListener("shown.bs.tab", e => {
        const tabId = e.target.dataset.bsTarget.replace("#", "");
        loadTabData(tabId);
    });
});