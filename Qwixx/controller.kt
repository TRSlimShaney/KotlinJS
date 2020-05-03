class Controller(val model : Model, val view : View) {

    init {
        println("Starting controller...")
        view.onRollButtonClicked(::rollButtonClicked)
        view.onNumberBoxClicked(::numberBoxClicked)
        view.onPassClicked(::passClicked)
        view.onViewClicked(::viewClicked)
        view.onDoneClicked(::doneClicked)
    }


    private fun rollButtonClicked() {
        model.rollDice()
        view.update(model)
    }

    private fun numberBoxClicked(row : Int, col : Int) {
        if (model.checkIfNBValid(row, col)) {
            model.numberBoxes[row][col].crossedOut = true
            model.tallyXs()
            view.update(model)
        }
    }

    private fun passClicked() {
        model.pass()
        view.update(model)
    }

    private fun viewClicked() {
        model.changeView()
        view.update(model)
    }

    private fun doneClicked() {
        model.changePlayers()
        view.update(model)
    }

}