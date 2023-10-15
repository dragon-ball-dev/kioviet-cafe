
function Header(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    return (
        <>
            <div id="preloder">
                <div class="loader"></div>
            </div>
            <div class="offcanvas-menu-overlay"></div>
            {authenticated ? (
                <>
                    <div class="offcanvas-menu-wrapper">
                        <div class="offcanvas__option">
                            <div class="offcanvas__links">
                                <a href="#">FAQs</a>
                            </div>
                            <div class="offcanvas__top__hover">
                                <span>{currentUser?.name}<i class="arrow_carrot-down"></i></span>
                                <ul style={{ width: "150px", textAlign: "center" }}>
                                    <li>Settings</li>
                                    <li><a onClick={onLogout} type="button">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="offcanvas__nav__option">
                            <a href="#" class="search-switch"><img src="../../assets/img/icon/search.png" alt="" /></a>
                            <a href="#"><img src="../../assets/img/icon/heart.png" alt="" /></a>
                            <a href="#"><img src="../../assets/img/icon/cart.png" alt="" /> <span>0</span></a>
                            <div class="price">$0.00</div>
                        </div>
                        <div id="mobile-menu-wrap"></div>
                        <div class="offcanvas__text">
                            <p>Free shipping, 30-day return or refund guarantee.</p>
                        </div>
                    </div>



                    <header class="header">
                        <div class="header__top">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 col-md-7">
                                        <div class="header__top__left">
                                            <p>Free shipping, 30-day return or refund guarantee.</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-5">
                                        <div class="header__top__right">
                                            <div class="header__top__links">
                                                <a href="#">FAQs</a>
                                            </div>
                                            <div class="header__top__hover">
                                                <span>{currentUser?.name}<i class="arrow_carrot-down"></i></span>
                                                <ul style={{ width: "150px", textAlign: "center" }}>
                                                    <li>Settings</li>
                                                    <li><a onClick={onLogout} type="button">Logout</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-md-3">
                                    <div class="header__logo">
                                        <a href="./index.html"><img src="../../assets/img/logo.png" alt="" /></a>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <nav class="header__menu mobile-menu">
                                        <ul>
                                            <li><a href="/">Home</a></li>
                                            <li><a href="/shop">Shop</a></li>
                                            <li><a href="/blog">Blog</a></li>
                                            <li><a href="/contact">Contacts</a></li>
                                            <li><a href="/about-us">About Us</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="header__nav__option">
                                        <a href="#" class="search-switch"><img src="../../assets/img/icon/search.png" alt="" /></a>
                                        <a href="#"><img src="../../assets/img/icon/heart.png" alt="" /></a>
                                        <a href="/shopping-cart"><img src="../../assets/img/icon/cart.png" alt="" /> <span>0</span></a>
                                        <div class="price">$0.00</div>
                                    </div>
                                </div>
                            </div>
                            <div class="canvas__open"><i class="fa fa-bars"></i></div>
                        </div>
                    </header>
                </>
            ) : (
                <>
                    <div class="offcanvas-menu-wrapper">
                        <div class="offcanvas__option">
                            <div class="offcanvas__links">
                                <a href="/login">Sign in</a>
                                <a href="#">FAQs</a>
                            </div>
                        </div>
                        <div class="offcanvas__nav__option">
                            <a href="#" class="search-switch"><img src="../../assets/img/icon/search.png" alt="" /></a>
                            <a href="#"><img src="../../assets/img/icon/heart.png" alt="" /></a>
                            <a href="#"><img src="../../assets/img/icon/cart.png" alt="" /> <span>0</span></a>
                            <div class="price">$0.00</div>
                        </div>
                        <div id="mobile-menu-wrap"></div>
                        <div class="offcanvas__text">
                            <p>Free shipping, 30-day return or refund guarantee.</p>
                        </div>
                    </div>



                    <header class="header">
                        <div class="header__top">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 col-md-7">
                                        <div class="header__top__left">
                                            <p>Free shipping, 30-day return or refund guarantee.</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-5">
                                        <div class="header__top__right">
                                            <div class="header__top__links">
                                                <a href="/login">Sign in</a>
                                                <a href="#">FAQs</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-md-3">
                                    <div class="header__logo">
                                        <a href="./index.html"><img src="../../assets/img/logo.png" alt="" /></a>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <nav class="header__menu mobile-menu">
                                        <ul>
                                            <li><a href="/">Home</a></li>
                                            <li><a href="/shop">Shop</a></li>
                                            <li><a href="/blog">Blog</a></li>
                                            <li><a href="/contact">Contacts</a></li>
                                            <li><a href="/about-us">About Us</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="header__nav__option">
                                        <a href="#" class="search-switch"><img src="../../assets/img/icon/search.png" alt="" /></a>
                                    </div>
                                </div>
                            </div>
                            <div class="canvas__open"><i class="fa fa-bars"></i></div>
                        </div>
                    </header>
                </>
            )
            }

        </>
    );
}

export default Header;