import kotlin.browser.document

class View(val row : Int, val col : Int){

    init {
        println("Starting view...")
    }

    
    fun onRollButtonClicked(callback : () -> Unit) {
        addEventListener("roll", callback)
    }

    fun onNumberBoxClicked(callback : (row : Int, col : Int) -> Unit) {
        for (i in 0 until this.row) {
            for (j in 0 until this.col) {
                val element = document.getElementById("nB" + i.toString() + "-" + j.toString())
                if (element == null) {
                    continue
                }
                element.addEventListener("click", {callback(i, j)})
            }
        }
    }

    fun onPassClicked(callback : () -> Unit) {
        addEventListener("pass", callback)
    }

    fun onViewClicked(callback : () -> Unit) {
        addEventListener("view", callback)
    }

    fun onDoneClicked(callback : () -> Unit) {
        addEventListener("done", callback)
    }

    fun addEventListener(elementID : String, callback : () -> Unit) {
        val element = document.getElementById(elementID)
        if (element == null) {
            return
        }
        element.addEventListener("click", {callback()})
    }


    fun update(model : Model) {
        for (i in 0 until model.wdice.size) {
            setInnerHTML("die-w" + i.toString(), model.wdice[i].toString())
        }

        for (i in 0 until model.dice.size) {
            setInnerHTML("die-" + i.toString(), model.dice[i].toString())
        }

        for (i in 0 until model.totals.size) {
            setInnerHTML(i.toString() + "-Tot", model.totals[i].toString())
        }

        setInnerHTML("0-wTot", model.penalty.toString())
        setInnerHTML("1-wTot", model.total.toString())
        setInnerHTML("curPlayer", (model.currentPlayer.num + 1).toString())
        setInnerHTML("curView", (model.currentView + 1).toString())

        for (i in 0 until model.numberBoxes.size) {
            for (j in 0 until model.numberBoxes[i].size) {
                if (model.numberBoxes[i][j].crossedOut == true) {
                    setInnerHTML("nB" + i.toString() + "-" + j.toString(), "X")
                }
                else if (model.numberBoxes[i][j].lockBox == true) {
                    setInnerHTML("nB" + i.toString() + "-" + j.toString(), "&#128274")
                }
                else {
                    setInnerHTML("nB" + i.toString() + "-" + j.toString(), model.findValue(i, j).toString())
                }
            }
        }
    }

    fun setInnerHTML(elementID : String, html : String) {
        val element = document.getElementById(elementID)
        if (element == null) {
            return
        }
        element.innerHTML = html
    }
    
}