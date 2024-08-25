import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    // Note: no const needed here
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {  // called when props are changed
        if (prevProps.charId !== this.props.charId) {   // if not checked => infinite loop
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) return;

        this.onCharLoading()
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
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

    render() {
        const {char, loading, error} = this.state;
        let renderContent = <Skeleton />;
        if (loading) {
            renderContent = <Spinner />;
        } else if (error) {
            renderContent = <ErrorMessage />;
        } else if (char) {
            renderContent = <View char={char} />;
        } 

        return (
            //{renderContent()}
            <div className="char__info">
                {renderContent}
            </div>
            /* alternative:
                {!(char || loading || error) && <Skeleton/>}
                {loading && <Spinner/>}
                {error && <ErrorMessage/>}
                {!(loading || error) && char && <View char={char}/>}
            */
        )
    }
}

const View = ({char}) => {
    const {name, thumbnail, description, homepage, wiki, comics} = char;
    const imgStyle = thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : null;
    const upToTenComics = comics.slice(0, Math.min(comics.length, 10))
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {upToTenComics.length > 0 ?
                    upToTenComics.map((item, i) => <li key={i} className="char__comics-item">{item.name}</li>)
                    : "There are no comics with this character"
                }
                
                
            </ul>
        </>
    )
}

export default CharInfo;