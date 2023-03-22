export const Home = () => {
    return (
        <section className="home_section">
            <div className="banner_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 ">
                            <div className="text-bg">
                                <h1>amazing 3d game</h1>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</span>
                                <a href="#">download</a>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 ">
                            <div className="text-img">
                                <figure><img src="images/img.png" alt="#" /></figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
