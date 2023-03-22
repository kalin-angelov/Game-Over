import { useForm } from '../../hooks/useForm';

export const Create = ({
    onAddNewGameSubmit
}) => {
    const { formValue, onFormValueChange } = useForm({
        title: '',
        genre: '',
        platform: '',
        players: '',
        imageUrl: '',
        summary: ''
    });

    return (
        <div id="contact" className="create">
            <div className="container">
                <div className="brand-logo"></div>
                <h1 className="titlePage">Add New Game</h1>
                <div className="row">

                    <div className="col-md-12">

                        <form className="create-form" onSubmit={(e) => onAddNewGameSubmit(e, formValue)}>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label htmlFor="title">Title: </label>
                                    <input 
                                        className="title" 
                                        placeholder="Title" 
                                        type="text" 
                                        name="title" 
                                        value={formValue.title} 
                                        onChange={onFormValueChange} 
                                    />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label htmlFor="genre">Genre: </label>
                                    <input 
                                        className="genre" 
                                        placeholder="Genre" 
                                        type="text" 
                                        name="genre" 
                                        value={formValue.genre} 
                                        onChange={onFormValueChange} 
                                    />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label htmlFor="platform">Platform: </label>
                                    <input 
                                        className="platform" 
                                        placeholder="Platform" 
                                        type="text" 
                                        name="platform" 
                                        value={formValue.platform} 
                                        onChange={onFormValueChange} 
                                    />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label htmlFor="players">Number Of Players: </label>
                                    <input 
                                        className="players" 
                                        placeholder="Players" 
                                        type="text" 
                                        name="players" 
                                        value={formValue.players} 
                                        onChange={onFormValueChange} 
                                    />
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <label htmlFor="imageUrl">ImageUrl: </label>
                                    <input 
                                        className="imageUrl" 
                                        placeholder="ImageUrl" 
                                        type="text" 
                                        name="imageUrl" 
                                        value={formValue.imageUrl} 
                                        onChange={onFormValueChange} 
                                    />
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <label htmlFor="summary">Summary: </label>
                                    <textarea 
                                        className="summary" 
                                        placeholder="Summary" 
                                        type="text" 
                                        name="summary" 
                                        value={formValue.summary} 
                                        onChange={onFormValueChange} 
                                    ></textarea>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <button className="send">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};
