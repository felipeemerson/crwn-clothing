import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOvervieWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribreFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections');
        
        fetch('https://firestore.googleapis.com/v1/projects/crwn-db-c0508/databases/(default)/documents/collections')
        .then(response => response.json())
        .then(collections => console.log(collections));


        // //Usando get() como uma chamada à uma API comum
        collectionRef.get().then(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });

        //Usando onSnapshot
        // collectionRef.onSnapshot( async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });
    }

    render() {
        const{ match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOvervieWithSpinner isLoading={loading} {...props} />} />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner  isLoading={loading} {...props} />}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap =>
        dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);