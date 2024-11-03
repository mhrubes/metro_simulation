import React, { useState, useEffect } from 'react'
import './App.css'
import { Collapse, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' // Import Bootstrap styles
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'

function App() {
    const [isRunning, setIsRunning] = useState(false)
    const [trains, setTrains] = useState([])
    const [stations, setStations] = useState([])
    const [selectedTrain, setSelectedTrain] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = useState(false)

    const maxPassengersLimit = 150
    const timeFromDepo = 3

    const stationsName = [
        'ZLIČÍN',
        'Stodůlky',
        'Luka',
        'Lužiny',
        'Hůrka',
        'Nové Butovice',
        'Jinonice',
        'Radlická',
        'Smíchovské nádraží',
        'Anděl',
        'Karlovo náměstí',
        'Národní třída',
        'Můstek',
        'Náměstí Republiky',
        'Florenc',
        'Křižíkova',
        'Invalidovna',
        'Palmovka',
        'Českomoravská',
        'Vysočanská',
        'Kolbenova',
        'Hloubětín',
        'Rajská zahrada',
        'ČERNÝ MOST'
    ]

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    useEffect(() => {
        const initialTrains = [
            ...Array.from({ length: 10 }, (v, i) => ({
                id: i + 1,
                name: `Vlak ${i + 1}`,
                active: true,
                station: 0,
                speed: 1,
                passengers: 0,
                totalPassengersCount: 0,
                totalStationsCount: 0,
                timeToStation: timeFromDepo,
                direction: 0
            }))
        ]
        setTrains(initialTrains)

        const initialStations = [
            {
                name: 'Depo',
                index: 0,
                distance: 0,
                distance: timeFromDepo,
                occupied: false,
                trains: initialTrains.map((train) => train.name)
            },
            ...Array.from({ length: 24 }, (v, i) => ({
                name: `${stationsName[i]}`,
                index: i + 1,
                distance: random(2, 5),
                occupied: false,
                trains: []
            }))
        ]
        setStations(initialStations)
    }, [])

    //     let interval
    //     if (isRunning) {
    //         interval = setInterval(() => {
    //             setTrains((prevTrains) => {
    //                 return prevTrains.map((train) => {
    //                     if (!train.active) return train

    //                     const currentStationIndex = train.station
    //                     const trainsAtStation = prevTrains.filter((t) => t.station === currentStationIndex && t.active)

    //                     if (train.timeToStation > 0) {
    //                         return {
    //                             ...train,
    //                             timeToStation: train.timeToStation - 1
    //                         }
    //                     } else {
    //                         let nextStationIndex = train.direction === 0 ? currentStationIndex + 1 : currentStationIndex - 1

    //                         const nextStation = stations[nextStationIndex]
    //                         const canMoveToNextStation =
    //                             nextStation &&
    //                             (nextStationIndex === 0 || // Povolit přístup do depa (index 0)
    //                                 !nextStation.occupied ||
    //                                 nextStation.trains.every((t) => prevTrains.find((tr) => tr.name === t).direction !== train.direction))

    //                         // Zde zkontrolujte, zda je poslední stanice obsazena
    //                         if (nextStationIndex === stations.length - 1) {
    //                             const isLastStationOccupied = prevTrains.some((t) => t.station === nextStationIndex && t.active)
    //                             if (isLastStationOccupied) {
    //                                 // Pokud je poslední stanice obsazena, nedovolte vlaku přistát
    //                                 return train // Vlak zůstává na stanici
    //                             }
    //                         }

    //                         if (nextStationIndex >= 0 && nextStationIndex < stations.length && canMoveToNextStation) {
    //                             const isFirstTrainAtStation = trainsAtStation.length > 0 && trainsAtStation[0].id === train.id
    //                             if (isFirstTrainAtStation) {
    //                                 const updatedStations = stations.map((station, i) => {
    //                                     if (i === currentStationIndex) {
    //                                         // Odebrat vlak z aktuální stanice
    //                                         return {
    //                                             ...station,
    //                                             occupied: station.trains.length > 1,
    //                                             trains: station.trains.filter((t) => t !== train.name) // Odebrání vlaku
    //                                         }
    //                                     }
    //                                     if (i === nextStationIndex) {
    //                                         // Přidat vlak do nové stanice
    //                                         return {
    //                                             ...station,
    //                                             occupied: true,
    //                                             trains: [...station.trains, train.name] // Přidání vlaku
    //                                         }
    //                                     }
    //                                     return station
    //                                 })

    //                                 // Nastavení aktualizovaných stanic
    //                                 setStations(updatedStations)

    //                                 const randomWaitTime = Math.floor(Math.random() * 5) + 3
    //                                 const passengersChange = Math.floor(Math.random() * 5)
    //                                 const newPassengerCount = Math.max(0, train.passengers + passengersChange)

    //                                 // Aktualizace vlaku
    //                                 setTrains((prevTrains) =>
    //                                     prevTrains.map((t) =>
    //                                         t.id === train.id
    //                                             ? {
    //                                                   ...t,
    //                                                   station: nextStationIndex,
    //                                                   timeToStation: randomWaitTime,
    //                                                   passengers: nextStationIndex === 0 && train.direction === 1 ? 0 : newPassengerCount, // Vyprázdnit pasažéry, pokud se vlak vrací do depa
    //                                                   direction: nextStationIndex === 0 ? 0 : nextStationIndex === stations.length - 1 ? 1 : train.direction // Změna směru na 0, když dojede do depa
    //                                               }
    //                                             : t
    //                                     )
    //                                 )

    //                                 // Nakonec, vrátit vlak s novou aktualizací
    //                                 return {
    //                                     ...train,
    //                                     station: nextStationIndex,
    //                                     timeToStation: randomWaitTime,
    //                                     passengers: nextStationIndex === 0 && train.direction === 1 ? 0 : newPassengerCount,
    //                                     direction: nextStationIndex === 0 ? 0 : nextStationIndex === stations.length - 1 ? 1 : train.direction // Změna směru na 0, když dojede do depa
    //                                 }
    //                             }

    //                             return train // Vlak zůstává na stanici
    //                         }

    //                         return train // Vlak zůstává na stanici
    //                     }
    //                 })
    //             })
    //         }, 1000)
    //     } else {
    //         clearInterval(interval)
    //     }

    //     console.log(trains)

    //     return () => clearInterval(interval)
    // }, [isRunning, stations])

    // Function to open modal

    // useEffect pro aktualizaci vlaků
    useEffect(() => {
        let interval
        if (isRunning) {
            interval = setInterval(() => {
                setTrains((prevTrains) => {
                    return prevTrains.map((train) => {
                        if (!train.active && train.station === 0) return train

                        const currentStationIndex = train.station
                        const trainsAtStation = prevTrains.filter((t) => t.station === currentStationIndex && (t.active || (!t.active && t.station !== 0)))

                        if (train.timeToStation > 0) {
                            return {
                                ...train,
                                timeToStation: train.timeToStation - 1
                            }
                        } else {
                            let nextStationIndex = train.direction === 0 ? currentStationIndex + 1 : currentStationIndex - 1

                            // Zde se kontroluje, zda je možné se přesunout na další stanici
                            const nextStation = stations[nextStationIndex]
                            const canMoveToNextStation =
                                nextStation &&
                                (nextStationIndex === 0 || // Povolit přístup do depa (index 0)
                                    !nextStation.occupied ||
                                    nextStation.trains.every((t) => prevTrains.find((tr) => tr.name === t).direction !== train.direction))

                            // Zde zkontrolujte, zda je poslední stanice obsazena
                            if (nextStationIndex === stations.length - 1) {
                                const isLastStationOccupied = prevTrains.some((t) => t.station === nextStationIndex && (t.active || (!t.active && t.station !== 0)))
                                if (isLastStationOccupied) {
                                    return train // Vlak zůstává na stanici
                                }
                            }

                            if (nextStationIndex >= 0 && nextStationIndex < stations.length && canMoveToNextStation) {
                                const isFirstTrainAtStation = trainsAtStation.length > 0 && trainsAtStation[0].id === train.id
                                if (isFirstTrainAtStation) {
                                    let randomWaitTime = train.direction === 0 ? stations[train.station + 1].distance : stations[train.station - 1].distance
                                    randomWaitTime += random(2, 3)

                                    const passengersChange = random(10, 50)
                                    const passengersChangeRem = random(1, 20)

                                    // Náhodně zvolíme, zda přičíst nebo odečíst
                                    const isAddingPassengers = Math.random() < 0.5 // 50% šance na přičtení nebo odečtení

                                    let newPassengerCount

                                    // Kontrola, zda vlak vyjíždí z Depa (index 0)
                                    if (train.station === 0) {
                                        // Přidáme pasažéry, pokud je vlak na Depu
                                        newPassengerCount = Math.min(train.passengers + passengersChange, maxPassengersLimit)
                                        train.totalPassengersCount += newPassengerCount
                                    } else if (train.station + 1 === stations.length - 1) {
                                        // Kontrola, zda vlak dorazil na poslední zastávku
                                        newPassengerCount = 0
                                    } else {
                                        // Normální případ: přičítání/odečítání pasažérů
                                        newPassengerCount = isAddingPassengers ? Math.min(train.passengers + passengersChange, maxPassengersLimit) : Math.max(0, train.passengers - passengersChangeRem)

                                        if (isAddingPassengers) {
                                            train.totalPassengersCount += newPassengerCount
                                        }
                                    }

                                    train.totalStationsCount++

                                    return {
                                        ...train,
                                        station: nextStationIndex,
                                        timeToStation: randomWaitTime,
                                        passengers: nextStationIndex === 0 && train.direction === 1 ? 0 : newPassengerCount,
                                        direction: nextStationIndex === 0 ? 0 : nextStationIndex === stations.length - 1 ? 1 : train.direction
                                    }
                                }
                            }
                            return train // Vlak zůstává na stanici
                        }
                    })
                })
            }, 1000)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isRunning, stations])

    // useEffect pro správu stanic
    useEffect(() => {
        setStations((prevStations) => {
            return prevStations.map((station, index) => {
                const trainsAtStation = trains.filter((t) => t.station === index)
                return {
                    ...station,
                    occupied: trainsAtStation.length > 0,
                    trains: trainsAtStation.map((t) => t.name)
                }
            })
        })
    }, [trains])

    const handleTrainClick = (train) => {
        setSelectedTrain(train)
        setShowModal(true)
    }

    // Function to close modal
    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedTrain(null)
    }

    // Function to save status change
    const handleChangeTrain = (train) => {
        // Kontrola, zda vlak může být neaktivní
        // if (train.active === false && train.station !== 0) {
        //     toast.error('Vlak může být neaktivní pouze na stanici Depo.')
        //     return
        // }

        // Uložení stavu
        setTrains((prevTrains) =>
            prevTrains.map((tr) =>
                tr.id === train.id
                    ? { ...tr, active: !tr.active } // Změna stavu na opačnou hodnotu
                    : tr
            )
        )

        train.station !== 0 ? toast.warn(`Stav vlaku '${train.name}' byl změněn.`) : toast.success(`Stav vlaku '${train.name}' byl změněn.`)
    }

    // Function to save status change
    const handleSaveStatus = () => {
        // if (selectedTrain.active === false && selectedTrain.station !== 0) {
        //     // Zobrazit chybovou zprávu, pokud vlak není na Depu
        //     toast.error('Vlak může být neaktivní pouze na stanici Depo.')
        //     return
        // }

        // Uložení stavu
        setTrains((prevTrains) => prevTrains.map((train) => (train.id === selectedTrain.id ? { ...train, active: selectedTrain.active } : train)))
        handleCloseModal() // Zavřít modální okno
    }

    // Function to toggle running state
    const toggleRunningState = () => {
        setIsRunning(!isRunning)
    }

    const totalPassengers = trains.reduce((sum, train) => sum + train.totalPassengersCount, 0)
    let totalStationsPassed = trains.reduce((sum, train) => sum + train.totalStationsCount, 0)

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Simulace metra</h1>
            <ToastContainer />
            {/* Button to toggle on/off */}
            <div className="mb-3 text-center">
                <button className={`btn ${isRunning ? 'btn-success' : 'btn-danger'}`} onClick={toggleRunningState}>
                    {isRunning ? 'Zapnuto' : 'Vypnuto'}
                </button>
            </div>
            {/* Button to toggle on/off */}
            <div className="mb-3 text-center">
                <span>
                    Celkový počet projetých stanic:
                    <motion.span
                        key={totalStationsPassed} // Spustí animaci při změně hodnoty
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }} // Nastavení trvání animace
                    >
                        <strong> {totalStationsPassed}</strong>
                    </motion.span>
                </span>

                <br />
                <span>
                    Celkový počet cestujících:
                    <motion.span
                        key={totalPassengers} // Spustí animaci při změně hodnoty
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }} // Nastavení trvání animace
                    >
                        <strong> {totalPassengers}</strong>
                    </motion.span>
                </span>
            </div>

            {/* Train table */}
            <div className="mb-5">
                <div className="text-center">
                    {/* Button to toggle collapse */}
                    <Button variant="outline-primary" onClick={() => setOpen(!open)} aria-controls="train-table-collapse" aria-expanded={open}>
                        {open ? 'Skrýt seznam vlaků' : 'Zobrazit seznam vlaků'}
                    </Button>
                </div>

                {/* Collapsible table */}
                <Collapse in={open}>
                    <div id="train-table-collapse">
                        <h2 className="text-center mb-3 mt-2">Seznam vlaků</h2>

                        <table className="table table-bordered table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Název vlaku</th>
                                    <th>Stanice</th>
                                    <th>Celkový počet projetých stanic</th>
                                    <th>Aktuální počet cestujících</th>
                                    <th>Celkový počet cestujících</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trains.map((train, index) => (
                                    <tr key={index}>
                                        <td>{train.name}</td>
                                        <td>{train.station === 0 ? 'Depo' : `${stationsName[train.station - 1]}`}</td>
                                        <td>{train.totalStationsCount}</td>
                                        <td>{train.passengers}</td>
                                        <td>{train.totalPassengersCount}</td>
                                        <td>
                                            <span className={`badge ${train.active ? 'bg-success' : 'bg-danger'}`}>{train.active ? 'Aktivní' : 'Neaktivní'}</span>
                                            <div className="form-check form-switch">
                                                <input type="checkbox" className="form-check-input" id="activeStatus" checked={train.active} onChange={() => handleChangeTrain(train)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Collapse>
            </div>

            {/* Station list */}
            <div className="row">
                {stations.map((item) => (
                    <div key={item.index} className="col-lg-3 col-md-4 col-sm-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title d-flex justify-content-between align-items-center">
                                    {item.name}
                                    <span
                                        className={`rounded-circle ${item.occupied ? 'bg-warning' : 'bg-secondary'}`}
                                        style={{
                                            width: '15px',
                                            height: '15px',
                                            display: 'inline-block'
                                        }}></span>
                                </h5>
                                <span className="badge bg-primary">Vzdálenost: {item.distance}</span>
                                <div className="mt-2">
                                    {item.trains.length > 0 ? (
                                        <div>
                                            <hr />
                                            <strong>Vlaky:</strong>
                                            <ul>
                                                {item.trains.map((trainName) => {
                                                    const train = trains.find((t) => t.name === trainName)
                                                    return train ? (
                                                        <li
                                                            key={train.id}
                                                            style={{
                                                                backgroundColor: !train.active ? 'lightyellow' : 'transparent'
                                                            }}>
                                                            {train.name} - směr <strong>{train.direction === 0 ? stations[stations.length - 1].name : stations[0].name}</strong>
                                                        </li>
                                                    ) : null
                                                })}
                                            </ul>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal for train details */}
            {showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detail vlaku</h5>
                            </div>
                            <div className="modal-body">
                                {selectedTrain && (
                                    <div>
                                        <p>
                                            <strong>Název:</strong> {selectedTrain.name}
                                        </p>
                                        <p>
                                            <strong>Stanice:</strong> {selectedTrain.station === 0 ? 'Depo' : `Zastávka ${selectedTrain.station}`}
                                        </p>
                                        <p>
                                            <strong>Rychlost:</strong> {selectedTrain.speed}
                                        </p>
                                        <p>
                                            <strong>Počet cestujících:</strong> {selectedTrain.passengers}
                                        </p>
                                        <label className="form-check-label" htmlFor="activeStatus">
                                            <strong>Status:</strong>
                                        </label>
                                        <div className="form-check form-switch">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="activeStatus"
                                                checked={selectedTrain.active}
                                                onChange={() => setSelectedTrain({ ...selectedTrain, active: !selectedTrain.active })}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSaveStatus}>
                                    Uložit
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Zavřít
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
