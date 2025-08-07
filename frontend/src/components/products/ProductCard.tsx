interface ProductCardProps {
  title: string;
  price: number;
  isRecommended?: boolean;
  strikeThroughPrice?: number;
  children: React.ReactNode;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  isRecommended,
  strikeThroughPrice,
  title,
  price,
  children,
}) => {
  return (
    <div className="relative bg-white rounded-2xl p-8 max-w-md shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      {isRecommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            Rekommenderas
          </span>
        </div>
      )}

      <div className="text-center pt-4">
        <h4 className="text-3xl font-bold text-gray-800 mb-3">{title}</h4>
        <div className="mb-2">
          {strikeThroughPrice ? (
            <div className="text-2xl text-red-500 line-through krugh mb-1">
              {strikeThroughPrice} kr
            </div>
          ) : (
            <br />
          )}
          <div className="text-5xl font-extrabold text-blue-800">{price} kr</div>
        </div>
        <p className="text-gray-800 mb-8 text-sm">Engångsbetalning</p>
        <ul className="text-left text-gray-700 space-y-4 mb-8">{children}</ul>
      </div>
    </div>
  );
};
