import RawDataTable from '../components/RawDataTable';

export default class MainApp extends React.Component {
  render() {
    return (
      <div class="RawData">
        <header>
            <h2 class="uk-heading-line uk-text-center"><span>Raw Reviews</span></h2>
          </header>
        <article class="uk-overflow-auto">
          <RawDataTable />
        </article>
      </div>
    );
  }
}
