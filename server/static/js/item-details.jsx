const ItemDetails = ({ item }) => {
    return (
        <div>
            <h3>{item.title}</h3>
            <img src={item.main_image} meta={item.title} />
            <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
            <p>${item.price}</p>
            <a href={item.link} target="_blank">Buy Now</a>
        </div>
    );
}