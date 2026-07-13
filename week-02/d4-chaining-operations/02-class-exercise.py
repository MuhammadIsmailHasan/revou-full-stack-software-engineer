"""
SET products = [
    {name: "Laptop", category: "Electronics", price: 999, qty: 15, rating: 4.5},
    {name: "T-Shirt", category: "Clothing", price: 25, qty: 100, rating: 4.2},
    {name: "Mouse", category: "Electronics", price: 35, qty: 50, rating: 4.7},
    {name: "Jeans", category: "Clothing", price: 60, qty: 40, rating: 3.8},
    {name: "Keyboard", category: "Electronics", price: 75, qty: 30, rating: 4.3},
    {name: "Headphones", category: "Electronics", price: 120, qty: 25, rating: 4.6},
    {name: "Shoes", category: "Clothing", price: 80, qty: 35, rating: 4.0},
    {name: "Monitor", category: "Electronics", price: 250, qty: 20, rating: 4.4},
    {name: "Jacket", category: "Clothing", price: 100, qty: 20, rating: 3.9},
    {name: "Webcam", category: "Electronics", price: 85, qty: 40, rating: 4.1}
]


FUNCTION processData(lists)
	SET totalStep = 0
	SET filtered = []

	FOR i FROM 0 TO LENGTH(lists) - 1 :
	  SET totalStep = totalStep + 2

	  IF lists[i].name == "Electronics" AND lists[i].rating >= 40 THEN

	    // total revenue
	    SET lists[i].revenue = transformFiltered(lists[i])
	    SET totalStep = totalStep + 1

	    // add product to filtered
	    ADD lists[i] TO filtered
	  END IF

	// total revenue
	SET totalRevenue = sum(filtered.revenue)

	// calculate average
	SET calculateAverage = averagePrice(filtered)
	SET totalStep = totalStep + calculateAverage.steps
	SET averageValue = calculateAverage.result

	// selection sort
	SET sortedFiltered = selectionSort(filtered)
	SET totalStep = totalStep + sortedFiltered.operations

	// get top 3
	SET topProducts = getTopN(sortedFiltered.sortedList, 3)

	RETURN {
		totalData : LENGTH(lists),
		filtered : sortedFiltered,
		totalRevenue : totalRevenue,
		averagePrice : averageValue,
		operations : totalStep,
		topProducts : topProducts
	}

END FUNCTION

FUNCTION transformFiltered(product) :
	SET revenue = product.price * product.qty
	RETURN revenue
END FUNCTION

FUNCTION averagePrice(filtered)
	IF LENGTH(filtered) == 0 THEN
		RETURN {
			result : 0,
			steps : 1
		}
	ELSE
		SET steps = 0
		SET sum = 0

		FOR i FROM 0 TO LENGTH(filtered) - 1
			SET sum = filtered[i].price + sum
			SET steps = steps + 1
		END FOR

		SET average = sum / LENGTH(filtered)

		RETURN {
			result : average,
			steps : steps
		}
	END IF
END FUNCTION


FUNCTION selectionSort(list)
	SET n = LENGTH(list)
  SET comparisons = 0
  SET swaps = 0

  FOR i FROM 0 TO n - 2:
      SET maxIndex = i
      SET maxValue = list[i].revenue

      FOR j FROM i + 1 TO n - 1:
          SET comparisons = comparisons + 1
          IF list[j].revenue > maxValue THEN
              SET maxIndex = j
              SET maxValue = list[j].revenue
          END IF
      END FOR

      IF maxIndex != i THEN
          SET temp = list[i]
          SET list[i] = list[maxIndex]
          SET list[maxIndex] = temp
          SET swaps = swaps + 1
      END IF
  END FOR

  RETURN {
	  operations : comparisons + swaps,
	  sortedList : list
  }

END FUNCTION


FUNCTION getTopN(filtered, topN)
	SET top = []
  FOR i FROM 0 TO MIN(topN - 1, LENGTH(filtered) - 1):
      ADD filtered[i] TO top
  END FOR

  RETURN top
END FUNCTION


processData(products)

"""