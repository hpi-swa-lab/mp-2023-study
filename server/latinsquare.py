# source: https://cs.uwaterloo.ca/~dmasson/tools/latin_square/
# How to use:
# var conditions = ["A", "B", "C", "D"];
# balancedLatinSquare(conditions, 0)  //=> ["A", "B", "D", "C"]
# balancedLatinSquare(conditions, 1)  //=> ["B", "C", "A", "D"]
# balancedLatinSquare(conditions, 2)  //=> ["C", "D", "B", "A"]
# ...
def balancedLatinSquare(array, participantId):
    result = []
    # Based on "Bradley, J. V. Complete counterbalancing of immediate sequential effects in a Latin square design. J. Amer. Statist. Ass.,.1958, 53, 525-528. "
    j = 0
    h = 0
    for i in range(len(array)):
        val = 0
        if i < 2 or i % 2 != 0:
            val = j
            j += 1
        else:
            val = len(array) - h - 1
            h += 1

        idx = (val + participantId) % len(array)
        result.append(array[idx])

    if len(array) % 2 != 0 and participantId % 2 != 0:
        result = result.reverse()

    return result
