import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({loading: true})
    }

    onCharListLoaded = (charList) => {
        this.setState({charList, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }


    render() {
        const {charList, loading, error} = this.state; 
        const content = !(loading || error) ? charList.map(c => <CharCard char={c} props={this.props}/>) : null;
        return (
            <div className="char__list">
                {error && <ErrorMessage/>}
                {loading && <Spinner/>}
                {content && <ul className="char__grid">{content}</ul>}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharCard = ({char, props}) => {
    const {id, name, thumbnail} = char;
    const imgStyle = thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : null;

    return (
        <li className="char__item"
            key={id}
            onClick={() => props.onCharSelected(id)}>
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;