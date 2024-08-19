import React from 'react';
import '../../css/TruckAnimation.css'; 
import truckImg from '../../img/truck.png'; 
import startImg from '../../img/ware.png';      
import placeholderImg from '../../img/ware.png';

const TruckAnimation = () => {
  return (
    <div className="map-container">
      {/* Truck */}
      <img src={truckImg} alt="Truck" className="truck" />

      {/* Start node */}
      <div className="node start-node">
        <img src={startImg} alt="Start" className="start node-img" onError={(e) => e.target.src = placeholderImg} />
        <div className="label">Start</div>
      </div>

      {/* Stop 1 */}
      <div className="node stop-1-node">
        <img src={startImg} alt="Stop 1" className="stop node-img" onError={(e) => e.target.src = placeholderImg} />
        <div className="label">Groceries</div>
      </div>

      {/* Stop 2 */}
      <div className="node stop-2-node">
        <img src={startImg} alt="Stop 2" className="stop node-img" onError={(e) => e.target.src = placeholderImg} />
        <div className="label">Furniture</div>
      </div>

      {/* Stop 3 */}
      <div className="node stop-3-node">
        <img src={startImg} alt="Stop 3" className="stop node-img" onError={(e) => e.target.src = placeholderImg} />
        <div className="label">Apparel</div>
      </div>

      {/* End node */}
      <div className="node end-node">
        <img src={startImg} alt="End" className="end node-img" onError={(e) => e.target.src = placeholderImg} />
        <div className="label">Electronics</div>
      </div>
    </div>
  );
};

export default TruckAnimation;
