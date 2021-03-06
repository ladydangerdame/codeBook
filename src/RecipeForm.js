import React, { Component } from 'react';
import style from './style';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';



class RecipeForm extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '', content: '', language: '', mode:'javascirpt' };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleContentChange(e) {
    let mode = e;
    this.setState({
        mode: mode,
        content: mode
     });
  }
  handleLanguageChange(e) {
    this.setState({ language: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    //TODO check here later for how to format the input string for content
    let title = this.state.title.trim();
    let content = this.state.content.trim();
    let language = this.state.language.trim();
    if (!title || !content){
      return;
    }
    this.props.onRecipeSubmit({ title: title, content: content, language: language });
    this.setState({ title: '', content: '', language: '' })
  }
  render() {
    let options = {
			lineNumbers: true,
			mode: 'javascript',
      theme: 'monokai'
		};
    return (
      <form style={ style.recipeForm } onSubmit={ this.handleSubmit }>

  			<Codemirror ref="editor" value={this.state.content} onChange={this.handleContentChange} options={options} interact={this.interact} />

        <input
          type='text'
          placeholder='Title'
          style={ style.recipeFormTitle}
          value={ this.state.title}
          onChange={ this.handleTitleChange }/>
        <input
          type='text'
          placeholder='Language'
          style={ style.recipeFormLanguage }
          value={ this.state.language }
          onChange={ this.handleLanguageChange }/>
        <input
          type='submit'
          style={ style.recipeFormPost }
          value='Post' />
      </form>
    )
  }
}

export default RecipeForm;
