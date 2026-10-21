"use client";
import { useState, useEffect } from "react";

interface AuthValue {
	isLoggedIn: boolean;
	currentUser: { id: number; username: string; role: string };
}

interface Order {
	id: number;
	userId: number;
	itemCount: number;
	total: number;
}

// Simulates GET http://localhost:5000/orders on the Flask backend.
function mockGetOrders(): Promise<Order[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 12, userId: 42, itemCount: 2, total: 400000 },
				{ id: 15, userId: 42, itemCount: 1, total: 150000 },
				{ id: 18, userId: 5, itemCount: 3, total: 750000 },
				{ id: 21, userId: 7, itemCount: 1, total: 90000 },
				{ id: 24, userId: 42, itemCount: 4, total: 510000 },
			]);
		}, 400);
	});
}

const rp = (n: number) => "Rp " + n.toLocaleString("id-ID");

// Pretend this comes from useAuth(). The logged-in customer is user #42.
function useAuth(role: string): AuthValue {
	return {
		isLoggedIn: true,
		currentUser:
			role === "admin"
				? { id: 1, username: "admin", role: "admin" }
				: { id: 42, username: "johndoe", role: "customer" },
	};
}

export default function App() {
	const [role, setRole] = useState("customer"); // 'customer' | 'admin'
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const { currentUser } = useAuth(role);

	useEffect(() => {
		mockGetOrders().then((data) => {
			setOrders(data);
			setLoading(false);
		});
	}, []);

	// TODO 1: build the rows for the current view.
	//   Customer -> only this user's orders:
	const rows =
		currentUser.role === "customer"
			? orders.filter((o) => o.userId === currentUser.id)
			: orders;

	const isAdmin = role === "admin";
	const path = isAdmin ? "/dashboard/orders" : "/orders";

	const cell = "p-3";
	const head = "p-3 text-left bg-gray-100";

	return (
		<main className="font-sans p-6 bg-gray-50 min-h-screen">
			<div className="flex gap-2 mb-4">
				<button
					onClick={() => {
						setRole("customer");
						setSelectedId(null);
					}}
					className={
						"px-3 py-1.5 rounded text-sm " +
						(!isAdmin
							? "bg-gray-900 text-white"
							: "bg-white border")
					}
				>
					Customer
				</button>
				<button
					onClick={() => {
						setRole("admin");
						setSelectedId(null);
					}}
					className={
						"px-3 py-1.5 rounded text-sm " +
						(isAdmin ? "bg-gray-900 text-white" : "bg-white border")
					}
				>
					Admin
				</button>
			</div>

			<p className="text-xs text-gray-500 mb-3">localhost:3000{path}</p>

			{selectedId && (
				<div className="mb-3 border border-blue-200 bg-blue-50 text-blue-700 rounded p-3 text-sm">
					Navigated to /orders/{selectedId} (order detail)
				</div>
			)}

			{loading ? (
				<p className="text-sm text-gray-500">Loading orders…</p>
			) : (
				<table className="w-full text-sm bg-white border rounded-lg overflow-hidden">
					<thead>
						<tr>
							{/* TODO 2: render the right column headers for the role.
                                Customer: Order ID | Items | Total
                                Admin:    Order | User | Items | Total */}

							{currentUser.role === "customer" ? (
								<>
									<th className={head}>Order ID</th>
									<th className={head}>Items</th>
									<th className={head}>Total</th>
								</>
							) : (
								<>
									<th className={head}>Order</th>
									<th className={head}>User</th>
									<th className={head}>Items</th>
									<th className={head}>Total</th>
								</>
							)}
						</tr>
					</thead>
					<tbody>
						{rows.map((o) => (
							<tr
								key={o.id}
								onClick={
									currentUser.role === "customer"
										? () => setSelectedId(o.id)
										: undefined
								}
								className={
									currentUser.role === "customer"
										? "cursor-pointer"
										: ""
								}
							>
								<td className={cell}>{o.id}</td>
								{currentUser.role === "admin" && (
									<td className={cell}>User #{o.userId}</td>
								)}
								<td className={cell}>{o.itemCount}</td>
								<td className={cell}>{rp(o.total)}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</main>
	);
}
