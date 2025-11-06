
import { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts data:', data);
        setWorkouts(data.results ? data.results : data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="display-4 mb-4">Workouts</h2>
      <div className="card mb-4">
        <div className="card-body">
          <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>Show Modal</button>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{workout.id || idx + 1}</td>
                  <td>{workout.name || '-'}</td>
                  <td>{workout.type || JSON.stringify(workout)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Example Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Workouts Modal</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <p>This is a Bootstrap modal example for Workouts.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Example Bootstrap Form */}
      <form className="mt-4">
        <div className="form-group">
          <label htmlFor="workoutName">Workout Name</label>
          <input type="text" className="form-control" id="workoutName" placeholder="Enter workout name" />
        </div>
        <button type="submit" className="btn btn-success mt-2">Submit</button>
      </form>
    </div>
  );
};

export default Workouts;
