from fastapi import FastAPI

app = FastAPI()
from fastapi import FastAPI
from pydantic import BaseModel
from itertools import combinations
from products import products

app = FastAPI()

# 入力モデル
class OptimizeRequest(BaseModel):
    target_pv: int
    required_names: list[str]


def optimize(products, target_pv):
    best_combo = None
    best_price = float("inf")

    for r in range(1, len(products) + 1):
        for combo in combinations(products, r):
            total_pv = sum(p["pv"] for p in combo)
            total_price = sum(p["price"] for p in combo)

            if total_pv >= target_pv:
                if total_price < best_price:
                    best_combo = combo
                    best_price = total_price

    return best_combo, best_price
def find_best(products, target_pv, required_names):
    required_products = [p for p in products if p["name"] in required_names]
    optional_products = [p for p in products if p["name"] not in required_names]

    combo_with_required, price_with_required = optimize(
        required_products + optional_products,
        target_pv
    )

    combo_without_required, price_without_required = optimize(
        optional_products,
        target_pv
    )

    if price_with_required <= price_without_required:
        return combo_with_required, price_with_required, "必須商品を含めた場合"
    else:
        return combo_without_required, price_without_required, "必須商品を含めない場合"


@app.post("/optimize")
def optimize_endpoint(req: OptimizeRequest):
    best_combo, best_price, mode = find_best(products, req.target_pv, req.required_names)

    return {
        "mode": mode,
        "total_price": best_price,
        "items": [
            {
                "name": p["name"],
                "pv": p["pv"],
                "price": p["price"]
            }
            for p in best_combo
        ]
    }


