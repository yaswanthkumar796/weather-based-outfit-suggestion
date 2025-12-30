const axios = require('axios');

async function testApi() {
    try {
        // Simulate request: New York coordinates, Male
        const response = await axios.get('http://localhost:5000/api/weather/current', {
            params: {
                lat: 40.7128,
                lon: -74.0060,
                city: 'New York',
                gender: 'Male' // Testing Male specifically
            }
        });

        const suggestions = response.data.suggestions;
        const formalOutfits = suggestions.filter(o => o.category === 'Formal');

        console.log(`Total Suggestions: ${suggestions.length}`);
        console.log(`Formal Outfits Found: ${formalOutfits.length}`);

        if (formalOutfits.length > 0) {
            console.log('✅ Formal outfits are present:');
            formalOutfits.forEach(o => console.log(`- ${o.name} (${o.season}) \n  URL: ${o.imageUrl}`));
        } else {
            console.log('❌ No Formal outfits found in response!');
            // Log seasons of all retrieved outfits to see if we are filtering by season correctly
            const seasons = [...new Set(suggestions.map(o => o.season).flat())];
            console.log(`Returned Seasons: ${seasons.join(', ')}`);
        }

    } catch (error) {
        console.error('API Error:', error.message);
        if (error.response) console.error('Response data:', error.response.data);
    }
}

testApi();
