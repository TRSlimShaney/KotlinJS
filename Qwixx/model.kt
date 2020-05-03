class Model(val rows : Int,  val maxCol : Int){

    private final val PLAYER1 = 0
    private final val PLAYER2 = 1
    private final val ROLL_PHASE = 1
    private final val WHITE_DICE_PHASE = 2
    private final val COLORED_DICE_PHASE = 3
    private final val END_PHASE = 4

    var wdice = mutableListOf<Int>(1, 2)
    var dice = mutableListOf<Int>(3, 4, 5, 6)
    var alrPassed = false
    var phase = 1
    var Xs = mutableListOf<Int>()
    var currentView = PLAYER1
    val players = mutableListOf<Player>()


    init {

        println("Starting model...")
        
        val numberBoxes1 = mutableListOf<MutableList<NumberBox>>()

        for (i in 0 until rows) {
            numberBoxes1.add(mutableListOf<NumberBox>())
            for (j in 0 until maxCol) {
                numberBoxes1[i].add(NumberBox())
                if (j == maxCol - 1) {
                    numberBoxes1[i][j].lockBox = true
                }
            }
        }

        val numberBoxes2 = mutableListOf<MutableList<NumberBox>>()

        for (i in 0 until rows) {
            numberBoxes2.add(mutableListOf<NumberBox>())
            for (j in 0 until maxCol) {
                numberBoxes2[i].add(NumberBox())
                if (j == maxCol - 1) {
                    numberBoxes2[i][j].lockBox = true
                }
            }
        }

        players.add(Player(rows, PLAYER1, numberBoxes1))
        players.add(Player(rows, PLAYER2, numberBoxes2))

        for (i in 0 until rows) {
            Xs.add(0)
        }
    }

    var currentPlayer = players[PLAYER1]
    var numberBoxes = currentPlayer.numberBoxes
    var totals = currentPlayer.totals
    var total = currentPlayer.total
    var penalty = currentPlayer.penalty
    var otherHasGone = false


    fun changeView() {
        if (currentView == PLAYER1) {
            players[0].total = total
            players[0].totals = totals
            players[0].penalty = penalty
            currentView = PLAYER2
        }
        else if (currentView == PLAYER2) {
            players[1].total = total
            players[1].totals = totals
            players[1].penalty = penalty
            currentView = PLAYER1
        }
        numberBoxes = players[currentView].numberBoxes
        totals = players[currentView].totals
        total = players[currentView].total
        penalty = players[currentView].penalty
    }

    fun changePlayers() {
        if (phase == ROLL_PHASE || !otherHasGone) {
            return
        }
        if (phase == WHITE_DICE_PHASE || (phase == COLORED_DICE_PHASE && alrPassed)) {
            penalty = penalty - 5
        }
        if (currentPlayer.num == PLAYER1) {
            currentPlayer = players[PLAYER2]
        }
        else if (currentPlayer.num == PLAYER2) {
            currentPlayer = players[PLAYER1]
        }
        Xs = clearArray(Xs)
        otherHasGone = false
        alrPassed = false
        phase = ROLL_PHASE
        if (currentView != currentPlayer.num) {
            changeView()
        }
    }

    fun rollDice() {
        if (currentPlayer.num != currentView || phase != ROLL_PHASE) {
            return
        }
        val range = (1..6)
        wdice = mutableListOf<Int>(range.random(), range.random())
        dice = mutableListOf<Int>(range.random(), range.random(), range.random(), range.random())
        phase = WHITE_DICE_PHASE
    }

    fun pass() {
        if (currentPlayer.num != currentView || phase == END_PHASE) {
            return
        }
        if (alrPassed) {
            penalty = penalty - 5
            phase = END_PHASE
        }
        else if (phase == WHITE_DICE_PHASE) {
            phase = COLORED_DICE_PHASE
            alrPassed = true
        }
        else if (phase == COLORED_DICE_PHASE) {
            phase = END_PHASE
        }
    }

    fun checkIfNBValidOther(col : Int, foundCol : Int, foundVal : Int) : Boolean {
        if (otherHasGone || foundCol >= col || wdice[0] + wdice[1] != foundVal) {
            return false
        }
        otherHasGone = true
        return true
    }

    fun checkIfNBValid(row : Int, col : Int) : Boolean {
        println("row " + row + " col " + col)
        val foundCol = findCol(row)
        val foundVal = findValue(row, col)

        if (currentPlayer.num != currentView) {
            return checkIfNBValidOther(col, foundCol, foundVal)
        }
        if (players[PLAYER1].numberBoxes[row][maxCol - 1].crossedOut || players[PLAYER2].numberBoxes[row][maxCol - 1].crossedOut) {
            return false
        }
        if (col == maxCol - 1) {
            if (Xs[row] >= 5) {
                return true
            }
        }
        if (phase == WHITE_DICE_PHASE) {
            if (foundCol >= col || wdice[0] + wdice[1] != foundVal) {
                return false
            }
            phase = COLORED_DICE_PHASE
            return true
        }
        else if (phase == COLORED_DICE_PHASE) {
            if (foundCol >= col || (wdice[0] + dice[row] != foundVal && wdice[1] + dice[row] != foundVal)) {
                return false
            }
            phase = END_PHASE
            return true
        }
        return false
    }

    fun findCol(row : Int) : Int {
        var foundCol = -1
        for (i in 0 until numberBoxes[row].size) {
            if (numberBoxes[row][i].crossedOut) {
                foundCol = i
            }
        }
        return foundCol
    }

    fun tallyXs() {
        total = 0
        Xs = clearArray(Xs)
        totals = clearArray(totals)
        for (i in 0 until numberBoxes.size) {
            for (j in 0 until numberBoxes[i].size) {
                if (numberBoxes[i][j].crossedOut) {
                    Xs[i] = Xs[i] + 1
                    val value = findValue(i, j)
                    totals[i] = totals[i] + value
                    total = total + value
                }
            }
        }
    }

    fun findValue(row : Int, col : Int) : Int {
        val firstHalf = col + 2
        val secHalf = maxCol - col
        if (row < rows/2) {
            return firstHalf
        }
        else {
            return secHalf
        }
    }

    private fun clearArray(array : MutableList<Int>) : MutableList<Int >{
        for (i in 0 until array.size) {
            array[i]
        }
        return array
    }
}

class NumberBox {
    var crossedOut = false
    var lockBox = false
}
class Player(numRows : Int, val num : Int, var numberBoxes : MutableList<MutableList<NumberBox>>) {
    var total = 0
    var penalty = 0
    var totals = mutableListOf<Int>()
    init {
        for (i in 0 until numRows) {
            totals.add(0)
        }
    }
}