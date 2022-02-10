
export default function ScoreForm (props) {
    return (
        <div className='formContainer' id='scoreSubmission'>
            <form>
                <fieldset id='forScore'>
                    <div>
                        <label htmlFor='name'>Enter Your Name: </label>
                        <input id='name' type='text' placeholder='ex. Julie' required maxLength='15'/>
                    </div>
                    <div>
                        <label htmlFor='score'>Your Time: </label>
                        <input id='score' type='text' readOnly={true} value=''/>
                    </div>
                    <div>
                        <input type='submit' value='Submit'/>
                        <button type='button' onClick={props.resetGame}>Reset</button>
                    </div>

                </fieldset>
            </form>
        </div>
    )

}