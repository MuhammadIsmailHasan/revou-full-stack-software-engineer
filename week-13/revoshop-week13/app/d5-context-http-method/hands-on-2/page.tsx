"use client";
import { useState } from "react";

const rp = (n: number) => "Rp " + n.toLocaleString("id-ID");
let nextId = 3;

type CreateResponse =
	| {
			ok: true;
			status: 201;
			body: { id: number; name: string; price: number };
	  }
	| { ok: false; status: 400; body: { error: string } };

type UpdateResponse = {
	ok: true;
	status: 200;
	body: { id: number; name: string };
};

type DeleteResponse =
	| { ok: true; status: 200; body: object }
	| { ok: false; status: 400; body: { error: string } };

// ===== Mock Flask endpoints — each returns { ok, status, body } =====
function mockCreate(data: {
	name: string;
	price: number;
}): Promise<CreateResponse> {
	return new Promise<CreateResponse>((resolve) =>
		setTimeout(() => {
			if (!data.name.trim())
				return resolve({
					ok: false,
					status: 400,
					body: { error: "Name is required" },
				});
			resolve({ ok: true, status: 201, body: { id: nextId++, ...data } });
		}, 300),
	);
}
function mockUpdate(
	id: number,
	data: { name: string },
): Promise<UpdateResponse> {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve({ ok: true, status: 200, body: { id, ...data } });
		}, 300),
	);
}
function mockDelete(id: number): Promise<DeleteResponse> {
	return new Promise((resolve) =>
		setTimeout(() => {
			// Product #2 ("Mouse") has active orders -> backend blocks the delete.
			if (id === 2)
				return resolve({
					ok: false,
					status: 400,
					body: {
						error: "Cannot delete — product has active orders",
					},
				});
			resolve({ ok: true, status: 200, body: {} });
		}, 300),
	);
}

export default function DashboardPage() {
	const [products, setProducts] = useState([
		{ id: 1, name: "Laptop Stand", price: 250000 },
		{ id: 2, name: "Mouse", price: 150000 },
	]);
	const [showCreate, setShowCreate] = useState(false);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [formError, setFormError] = useState("");
	const [confirmId, setConfirmId] = useState<number | null>(null); // which row is asking "Are you sure?"
	const [rowError, setRowError] = useState(""); // a failed DELETE message

	async function handleCreate() {
		setFormError("");
		const res = await mockCreate({ name, price: Number(price) });
		if (res.status === 201) {
			setProducts([...products, res.body]);
			setShowCreate(false);
			setName("");
			setPrice("");
		}
		if (res.status === 400) {
			setFormError(res.body.error);
		}
	}

	async function handleUpdate(id: number, newName: string) {
		const res = await mockUpdate(id, { name: newName });
		if (res.status === 200) {
			setProducts(
				products.map((p) => (p.id === id ? { ...p, ...res.body } : p)),
			);
		}
	}

	async function handleDelete(id: number) {
		setRowError("");
		const res = await mockDelete(id);

		if (res.ok) {
			setProducts(products.filter((p) => p.id !== id));
			setConfirmId(null);
		} else if (res.status === 400) {
			setRowError(res.body.error);
		}
	}

	return (
		<main className="font-sans p-6 bg-gray-50 min-h-screen">
			<p className="text-xs text-gray-500 mb-3">
				localhost:3000/dashboard
			</p>

			<div className="flex items-center gap-3 mb-4">
				<h1 className="text-xl font-semibold mr-auto">Products</h1>
				<button
					onClick={() => setShowCreate((s) => !s)}
					className="px-3 py-1.5 bg-gray-900 text-white rounded text-sm"
				>
					+ New product
				</button>
			</div>

			{showCreate && (
				<div className="border rounded-lg p-4 bg-white mb-4 max-w-sm">
					<p className="font-medium mb-2">New product</p>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						className="w-full border rounded px-3 py-2 mb-2"
					/>
					<input
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Price"
						className="w-full border rounded px-3 py-2 mb-2"
					/>
					{formError && (
						<p className="text-sm text-red-600 mb-2">{formError}</p>
					)}
					<button
						onClick={handleCreate}
						className="px-3 py-1.5 bg-gray-900 text-white rounded text-sm"
					>
						Create
					</button>
				</div>
			)}

			<table className="w-full text-sm bg-white border rounded-lg overflow-hidden">
				<thead className="bg-gray-100 text-left">
					<tr>
						<th className="p-3">Name</th>
						<th className="p-3">Price</th>
						<th className="p-3">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((p) => (
						<tr key={p.id} className="border-t align-top">
							<td className="p-3 font-medium">{p.name}</td>
							<td className="p-3">{rp(p.price)}</td>
							<td className="p-3">
								<div className="flex gap-2">
									<button
										onClick={() =>
											handleUpdate(
												p.id,
												p.name + " (edited)",
											)
										}
										className="px-2 py-1 border rounded"
									>
										Edit
									</button>
									<button
										onClick={() => {
											setConfirmId(p.id);
											setRowError("");
										}}
										className="px-2 py-1 border rounded text-red-600"
									>
										Del
									</button>
								</div>
								{confirmId === p.id && (
									<div className="mt-2 border border-amber-300 bg-amber-50 rounded p-2">
										<p className="text-amber-800 mb-2">
											&#9888; Delete &quot;{p.name}&quot;?
											This cannot be undone.
										</p>
										<div className="flex gap-2">
											<button
												onClick={() =>
													setConfirmId(null)
												}
												className="px-2 py-1 border rounded"
											>
												Cancel
											</button>
											<button
												onClick={() =>
													handleDelete(p.id)
												}
												className="px-2 py-1 bg-red-600 text-white rounded"
											>
												Yes, delete
											</button>
										</div>
										{rowError && (
											<p className="text-sm text-red-600 mt-2">
												{rowError}
											</p>
										)}
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
