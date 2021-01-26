import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from './words'
import img0 from "./img/0.png";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import img4 from "./img/4.png";
import img5 from "./img/5.png";
import img6 from "./img/6.png";


export default class Hangman extends Component {
  /** by default, allow 6 wrong guesses */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord()}; // Set: store unique lettes that have been guessed
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  /** show current-state of word: if guessed letters are {a,p,e}, show "app_e" for "apple" */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** add to guessed letters: if letter not in answer, increase number-wrong guesses */
  handleGuess(e) {
    let ltr = e.target.value;
    this.setState(state => ({
      guessed: state.guessed.add(ltr),
      nWrong: state.nWrong + (state.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  reset() {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() })
  }


  /** render game */
  render() {
    const { nWrong, answer } = this.state;
    const { maxWrong, images } = this.props;

    const gameOver = nWrong >= maxWrong;
    const isWinner = this.guessedWord().join("") === answer;
    const altText = `${nWrong}/${maxWrong} guesses`;
    let gameState = this.generateButtons();

    if (isWinner) gameState = 'YOU WIN!!! ~PHEW';
    if (gameOver) gameState = 'YOU LOSE... ';

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={images[nWrong]} alt={altText} />
        <p># Wrong Guesses: {nWrong} / {maxWrong}</p>
        <p className='Hangman-word'>
          {!gameOver ? this.guessedWord() : answer}
        </p>
        <p className='Hangman-btns'>{gameState}</p>
        <button id="reset" onClick={this.reset}>Restart</button>
      </div>
    );
  }
}
