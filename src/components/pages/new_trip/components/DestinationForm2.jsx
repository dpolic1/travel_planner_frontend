

export default function DestinationForm() {
    return (
      <section>
          <form>
              <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select className="form-control" id="country">
                      <option>Choose...</option>
                      <option>...</option>
                  </select>
              </div>
          </form>
      </section>
    )
  }