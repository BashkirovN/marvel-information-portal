import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from "../../services/MarvelService";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';



class RandomChar extends Component {
    // Note: constructor is no longer needed with the newer versions of React
    // Note: DON'T call this.updateChar() in constructor - causes multiple API calls

    state = {
        char: {},
        loading: true,
        error: false
    }

    // Note: no const needed here
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        //this.timerId = setInterval(this.updateChar, 10_000);
    }

    componentWillUnmount() {
        //clearInterval(this.timerId);
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateChar = () => {
        // Most ids in this range have characters but some return 404
        // Test id: 1011267
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        //const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
        console.log("random char id: "+id)

        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {
        const {char, loading, error} = this.state; 
        const errorMessage = error ?  <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
        // Note: null values won't be rendered

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                            onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const imgStyle = thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : null;

    return (
        <div className="randomchar__block">
            <img src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;